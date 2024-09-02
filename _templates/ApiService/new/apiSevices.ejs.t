---
to: <%-outDir%>
---
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse , AxiosInstance } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";

export enum ApiKey {
  <%
  Object.entries(paths).forEach(([path, opData]) => {
    Object.entries(opData).forEach(([method, apiDetails]) => {
  %>
  <%- apiDetails.operationId %> = "<%- apiDetails.operationId %>",
  <%
    });
  });
  %>
}

// Render the models
<% Object.entries(models).forEach(([name, obj]) => {%>
export interface <%= name %>Model {
  <%- generateType(obj.properties, Object.entries(obj.properties).map(([key])=>key)) %>
}
<% }) %>

<%
Object.entries(paths).forEach(([path, opData]) => {
  Object.entries(opData).forEach(([method, apiDetails]) => {
    const axiosMethod = method.toLowerCase();
    const isPostMethod = method === "post";
    const operationId = apiDetails.operationId || `${method}${path.replace(/[^a-zA-Z0-9]/g, '')}`;
    const queryType = isPostMethod ? "mutation" : "query";
%>

export interface <%- apiDetails.operationId %>Request {
  <% 
  const requestBodySchema = apiDetails.requestBody.content['application/json'].schema;
  if (requestBodySchema && requestBodySchema.properties) {
    const properties = requestBodySchema.properties;
    const required = requestBodySchema.required || [];
  %>
  <%- generateType(properties, required) %>
  <% } %>
}


<%
  const responseSchema = apiDetails.responses['200']?.content['application/json']?.schema;
  if (responseSchema && responseSchema.properties) {
    const properties = responseSchema.properties;
    const required = responseSchema.required || [];
%>
export interface <%- apiDetails.operationId %>Response {
  <%- generateType(properties, required) %>
}
<% } else { %>
export type <%- apiDetails.operationId %>Response = any;
<% } %>


const <%- operationId %> = (axios : AxiosInstance) => {
  const <%- queryType %> = (params : {body: <%- apiDetails.operationId %>Request}): Promise<AxiosResponse<<%- apiDetails.operationId %>Response>> => axios.<%- axiosMethod %>('<%- path %>', params.body);

  return {
    <%- queryType %>,
    <%- isPostMethod ? "useMutation" : "useQuery" %>: (options?: Omit<UseMutationOptions<AxiosResponse<<%- apiDetails.operationId %>Response, any>, any,{body :<%- apiDetails.operationId %>Request}>, "mutationFn"> | undefined) => <%- isPostMethod ? "useMutation" : "useQuery" %>({...options ,<%- isPostMethod ? "mutationFn" : "queryFn"%> : <%- queryType %>,} || {})
  };
};
<% }); 
}); 
%>

export {
<%
Object.entries(paths).forEach(([path, opData]) => {
  Object.entries(opData).forEach(([method, apiDetails]) => {
    const operationId = apiDetails.operationId || `${method}${path.replace(/[^a-zA-Z0-9]/g, '')}`;
%>
  <%- operationId %>,
<% }); 
}); 
%>
};
