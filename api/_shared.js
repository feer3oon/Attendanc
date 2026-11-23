import {createHmac,timingSafeEqual} from "node:crypto";
export const json=(r,s,b)=>r.status(s).setHeader("Cache-Control","no-store").json(b);
const cookie=req=>{const x=(req.headers.cookie||"").split(";").map(v=>v.trim()).find(v=>v.startsWith("dama_session="));return x?decodeURIComponent(x.slice(13)):""};
const sign=p=>createHmac("sha256",process.env.SESSION_SECRET||"").update(p).digest("hex");
export const makeSession=()=>{const p=Buffer.from(JSON.stringify({exp:Date.now()+28800000})).toString("base64url");return p+"."+sign(p)};
export function isAuth(req){if(!process.env.SESSION_SECRET)return false;const [p,s]=cookie(req).split(".");if(!p||!s)return false;const a=Buffer.from(s),b=Buffer.from(sign(p));if(a.length!==b.length||!timingSafeEqual(a,b))return false;try{return JSON.parse(Buffer.from(p,"base64url")).exp>Date.now()}catch{return false}}
export function requireAuth(req,res){if(isAuth(req))return true;json(res,401,{message:"سجّل الدخول أولاً."});return false}
export const cookieOpts=n=>`Path=/; HttpOnly; SameSite=Strict; Max-Age=${n}${process.env.NODE_ENV==="production"?"; Secure":""}`;
export function safeEq(x,y){const a=Buffer.from(String(x)),b=Buffer.from(String(y));return a.length===b.length&&timingSafeEqual(a,b)}
