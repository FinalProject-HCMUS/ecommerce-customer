import{c as i}from"./App-Cy2zvDKu.js";import{m as l,r as d}from"./index-YT-tQ_yZ.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=i("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),g=async(a=0,t=10,s,n)=>{const e=new URLSearchParams;return e.append("page",a.toString()),e.append("size",t.toString()),s&&s.length&&s.forEach(o=>e.append("sort",o)),n&&e.append("keysearch",n),(await l.get(`/blogs?${e.toString()}`)).data},u=async a=>(await l.get(`/blogs/${a}`)).data,m=()=>{const[a,t]=d.useState(!1);return{loading:a,fetchBlogs:async(e=0,r=10,o,p)=>{t(!0);try{const c=await g(e,r,o,p);return c.isSuccess&&c.data?c.data:null}catch{return null}finally{t(!1)}},fetchBlogById:async e=>{t(!0);try{return(await u(e)).data||null}catch{return null}finally{t(!1)}}}};export{f as C,m as u};
