import { Request, Response } from "express";
import { getAccountsFromES } from "../../services/accounts.service";

/**
 * @openapi
 * /accounts:
 *   post:
 *     operationId: getAccounts
 *     summary: Get Accounts
 *     tags: [accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pagination
 *             properties:
 *               filters:
 *                 type: object
 *                 optional: true
 *                 description: Filter accounts by specific fields
 *               pagination:
 *                 type: object
 *                 properties:
 *                   pageIndex:
 *                     type: integer
 *                     description: Page number
 *                     example: 1
 *                   pageCount:
 *                     type: integer
 *                     description: Page size
 *                     example: 10
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: any
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: any
 */

const getAccounts = async (req: Request, res: Response) => {
    const accounts = await getAccountsFromES(req.body);

    const total = typeof accounts.hits.total === 'number'
        ? accounts.hits.total
        : accounts.hits.total?.value!;

    res.status(200).send({
        data: accounts.hits.hits.map((account)=>account._source),
        total: total,
        page: req.body.pagination.pageIndex,
        limit: req.body.pagination.pageCount,
        pages: total / req.body.pagination.pageCount
    });
}

export default getAccounts;