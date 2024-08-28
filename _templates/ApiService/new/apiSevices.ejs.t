---
to: <%-outDir%>
---
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosResponse , AxiosInstance } from "axios";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";

export enum ApiKey {
  <%
  Object.entries(jsonData.paths).forEach(([path, opData]) => {
    Object.entries(opData).forEach(([method, apiDetails]) => {
  %>
  <%- apiDetails.operationId %> = "<%- apiDetails.operationId %>",
  <%
    });
  });
  %>
}

<%
Object.entries(jsonData.paths).forEach(([path, opData]) => {
  Object.entries(opData).forEach(([method, apiDetails]) => {
    const axiosMethod = method.toLowerCase();
    const isPostMethod = method === "post";
    const operationId = apiDetails.operationId || `${method}${path.replace(/[^a-zA-Z0-9]/g, '')}`;
    const queryType = isPostMethod ? "mutation" : "query";
%>

interface <%- apiDetails.operationId %>Request {
  <% Object.entries(apiDetails.requestBody.content['application/json'].schema.properties).forEach(([key , object]) => { %>
  <%- key %><%-object.optional && '?'%>: <%- object.type%>;
  <% }) %>
}

<% 
const response = apiDetails.responses['200'] || apiDetails.responses['201'];
if (response && response.content && response.content['application/json'] && response.content['application/json'].schema && response.content['application/json'].schema.properties) { %>
  interface <%- apiDetails.operationId %>Response {
    <% Object.entries(response.content['application/json'].schema.properties).forEach(([key , object]) => { %>
      <%- key %><%- object.optional ? '?' : '' %>: <%- object.type %>;
    <% }) %>
  }
<% } else { %>
  type <%- apiDetails.operationId %>Response = <%-response.content['application/json'].schema.type ?? any%>;
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
Object.entries(jsonData.paths).forEach(([path, opData]) => {
  Object.entries(opData).forEach(([method, apiDetails]) => {
    const operationId = apiDetails.operationId || `${method}${path.replace(/[^a-zA-Z0-9]/g, '')}`;
%>
  <%- operationId %>,
<% }); 
}); 
%>
};
