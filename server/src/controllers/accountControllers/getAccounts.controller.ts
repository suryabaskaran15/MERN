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
 *                 description: Filter accounts by specific fields
 *               sort:
 *                 type: object
 *                 description: Sorting fields
 *               pagination:
 *                 type: object
 *                 required:
 *                   - pageIndex
 *                   - pageSize
 *                 properties:
 *                   pageIndex:
 *                     type: number
 *                     description: Page number
 *                     example: 1
 *                   pageSize:
 *                     type: number
 *                     description: Page size
 *                     example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - data
 *                 - total
 *                 - page
 *                 - limit
 *                 - pages
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Account'
 *                 total:
 *                   type: number
 *                   description: Total number of accounts
 *                 page:
 *                   type: number
 *                   description: Current page index
 *                 limit:
 *                   type: number
 *                   description: Number of accounts per page
 *                 pages:
 *                   type: number
 *                   description: Total number of pages
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied"
 */

const getAccounts = async (req: Request, res: Response) => {
    const accounts = await getAccountsFromES(req.body);

    const total = typeof accounts.hits.total === 'number'
        ? accounts.hits.total
        : accounts.hits.total?.value as number;
    const pages = total / req.body.pagination.pageSize;

    res.status(200).send({
        data: accounts.hits.hits.map((account)=>({ ... account._source as object ,_id : account._id  })),
        total: total,
        page: req.body.pagination.pageIndex,
        limit: req.body.pagination.pageCount,
        pages: Math.round(pages) ?? 1
    });
}

export default getAccounts;