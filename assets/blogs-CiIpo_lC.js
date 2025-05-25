import{d as i}from"./App-4Od_FrKz.js";import{r as d}from"./index-D05w7RTC.js";import{c as l}from"./request-B_Pa-C8s.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=i("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),g=async(a=0,e=10,s,n)=>{const t=new URLSearchParams;return t.append("page",a.toString()),t.append("size",e.toString()),s&&s.length&&s.forEach(o=>t.append("sort",o)),n&&t.append("keysearch",n),(await l.get(`/blogs?${t.toString()}`)).data},u=async a=>(await l.get(`/blogs/${a}`)).data,B=()=>{const[a,e]=d.useState(!1);return{loading:a,fetchBlogs:async(t=0,r=10,o,p)=>{e(!0);try{const c=await g(t,r,o,p);return c.isSuccess&&c.data?c.data:null}catch{return null}finally{e(!1)}},fetchBlogById:async t=>{e(!0);try{return(await u(t)).data||null}catch{return null}finally{e(!1)}}}};export{m as C,B as u};
