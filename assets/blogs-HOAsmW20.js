import{d as c}from"./App-xiYN4thl.js";import{d as l,c as s,r as i}from"./index-DqUOqSxb.js";import{c as o}from"./request-BN0nrF5y.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=c("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),B=e=>{const t=new Date(e);return new Intl.DateTimeFormat(l()===s.REGIONS.vi.key?s.VN:s.EN,{year:"numeric",month:"long",day:"numeric"}).format(t)},g=async(e,t)=>(await o.get(`/blogs?page=${e}&size=${t}`)).data,y=async e=>(await o.get(`/blogs/${e}`)).data,w=()=>{const[e,t]=i.useState(!1);return{loading:e,fetchBlogs:async(a,n)=>{t(!0);try{return(await g(a,n)).data}finally{t(!1)}},fetchBlogById:async a=>{t(!0);try{return(await y(a)).data||null}catch{return null}finally{t(!1)}}}};export{h as C,B as f,w as u};
