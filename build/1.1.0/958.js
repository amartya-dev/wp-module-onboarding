"use strict";(self.webpackChunknewfold_Onboarding=self.webpackChunknewfold_Onboarding||[]).push([[958],{4316:function(e,t,n){var a=n(9307),s=n(5736);t.Z=e=>{let{title:t,subtitle:n}=e;return(0,a.createElement)("div",{className:"nfd-main-heading"},(0,a.createElement)("h2",{className:"nfd-main-heading__title"},(0,s.__)(t,"wp-module-onboarding")),(0,a.createElement)("h3",{className:"nfd-main-heading__subtitle"},(0,s.__)(n,"wp-module-onboarding")))}},5791:function(e,t,n){n.d(t,{Z:function(){return b}});var a=n(9307),s=n(4184),c=n.n(s),l=n(5158),i=n(6974),r=n(2200),o=n(6989),d=n.n(o),u=n(4704),m=e=>{let{className:t="nfd-onboarding-layout__base",children:n}=e;const s=(0,i.TH)(),o=document.querySelector(".nfd-onboard-content");return(0,a.useEffect)((()=>{null==o||o.focus({preventScroll:!0}),function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Showing new Onboarding Page";(0,l.speak)(t,"assertive")}(s,"Override"),new class{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.eventSlug=e,this.eventData=t}send(){d()({url:(0,u.F)("events"),method:"POST",data:{slug:this.eventSlug,data:this.eventData}}).catch((e=>{console.error(e)}))}}(`${r.Db}-pageview`,{stepID:s.pathname,previousStepID:window.nfdOnboarding.previousStepID}).send(),window.nfdOnboarding.previousStepID=s.pathname}),[s.pathname]),(0,a.createElement)("div",{className:c()("nfd-onboarding-layout",t)},n)},h=n(682);const v=e=>{let{children:t}=e;return(0,a.createElement)("section",{className:"is-contained"},t)};var b=e=>{let{className:t="",children:n,isBgPrimary:s=!1,isCentered:l=!1,isVerticallyCentered:i=!1,isContained:r=!1,isPadded:o=!1,isFadeIn:d=!0}=e;const u=r?v:a.Fragment;return(0,a.createElement)(h.Z,{type:d&&"fade-in",duration:"233ms",timingFunction:"ease-in-out"},(0,a.createElement)(m,{className:c()("nfd-onboarding-layout__common",t,{"is-bg-primary":s},{"is-centered":l},{"is-vertically-centered":i},{"is-padded":o})},(0,a.createElement)(u,null,n)))}},8958:function(e,t,n){n.r(t),n.d(t,{default:function(){return E}});var a=n(9307),s=n(2819),c=n(4333),l=n(9818),i=n(9685),r=n(2200),o=n(5791),d=n(3421),u=n(4316),m=n(1984),h=n(6058),v=n(5609),b=n(682),p=e=>{let{name:t,icon:n,title:s,desc:c,subtitle:l,callback:i,isSelectedDefault:r,className:o="checkbox-item"}=e;const[d,u]=(0,a.useState)(!1),[p,g]=(0,a.useState)(r);return(0,a.createElement)("div",null,(0,a.createElement)("div",{className:`${o} ${p&&`${o}--selected`} ${d&&`${o}--shown`}`},(0,a.createElement)("div",{className:`${o}-container`},(0,a.createElement)(v.CheckboxControl,{checked:p,onChange:()=>{g(!p),i(t,!p)},className:`${o}-checkbox`}),(0,a.createElement)("div",{className:`${o}__contents`},(0,a.createElement)("div",{className:`${o}__contents-icon\n                                     ${p&&`${o}__contents-icon--selected`}\n                                     ${d&&`${o}__contents-icon--shown`}`},(0,a.createElement)("div",{style:{width:"35px",height:"35px",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundImage:`var(${n}${p?"--light":""})`}})),(0,a.createElement)("div",{className:`${o}__contents-text`},(0,a.createElement)("div",{className:`${o}__contents-text-title ${p&&`${o}__contents-text-title--selected`}`},s),(0,a.createElement)("div",{className:`${o}__contents-text-subtitle`},l)),(0,a.createElement)("div",{className:`${o}__contents-help`,onClick:()=>{u(!d)}},(0,a.createElement)(m.Z,{icon:h.Z,style:{width:"30px",height:"30px",fill:d?"#1C5CBA":"#666666"}}))))),d&&(0,a.createElement)(b.Z,{className:` ${o}__dropdown `,type:"dropdown"},(0,a.createElement)("div",{className:`${o}__desc`},c)))},g=e=>{let{count:t}=e;const n=()=>{const e=[];for(let n=0;n<t;n++)e.push((0,a.createElement)(b.Z,{type:"shine-placeholder",className:"checkbox-skeleton-item"}));return e};return(0,a.createElement)("div",{className:"checkbox-list"},(0,a.createElement)("div",{className:"checkbox-list-col"},n().slice(0,Math.floor(t/2))),(0,a.createElement)("div",{className:"checkbox-list-col"},n().slice(Math.floor(t/2),t)))},f=e=>{let{callback:t,selectedItems:n,customItemsList:s}=e;const c=Object.keys(s).length,l=()=>{var e=[];for(const l in s){var c=s[l];const i=n[c.slug];e.push((0,a.createElement)(p,{name:c.slug,icon:c.icon,title:c.title,subtitle:c.subtitle,desc:c.desc,callback:t,isSelectedDefault:null!=i&&i}))}return e};return(0,a.createElement)("div",{className:"checkbox-list"},(0,a.createElement)("div",{className:"checkbox-list-col"},l().slice(0,Math.floor(c/2))),(0,a.createElement)("div",{className:"checkbox-list-col"},l().slice(Math.floor(c/2),c)))},E=()=>{var e;const t=(0,c.useViewportMatch)("medium"),[n,m]=(0,a.useState)(!1),[h,v]=(0,a.useState)(),[b,p]=(0,a.useState)(),{setIsDrawerOpened:E,setDrawerActiveView:_,setSidebarActiveView:w,setCurrentOnboardingData:N,setIsDrawerSuppressed:k,setIsHeaderNavigationEnabled:$}=(0,l.useDispatch)(i.h),{currentStep:S,currentData:y,themeVariations:x}=(0,l.useSelect)((e=>({currentStep:e(i.h).getCurrentStep(),currentData:e(i.h).getCurrentOnboardingData(),themeVariations:e(i.h).getStepPreviewData()})),[]);return(0,a.useEffect)((()=>{n||async function(){var e,t;const n=await(0,d.yn)();(0,s.isEmpty)(null==y||null===(e=y.data)||void 0===e?void 0:e.siteFeatures)?async function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n={};for(const t in e){const a=e[t];n[a.slug]=a.selected}v(n),t&&(y.data.siteFeatures={...n},N(y))}(n.body,!0):v({...null==y||null===(t=y.data)||void 0===t?void 0:t.siteFeatures}),p(n.body),m(!0)}()}),[n]),(0,a.useEffect)((()=>{t&&E(!1),w(r.Jq),k(!1),_(r.tM),$(!0)}),[]),(0,a.createElement)(o.Z,null,(0,a.createElement)("div",{style:{margin:"100px"}},(0,a.createElement)(u.Z,{title:null==S?void 0:S.heading,subtitle:null==S?void 0:S.subheading})),!b&&(0,a.createElement)(g,{count:null===(e=x[null==S?void 0:S.patternId])||void 0===e?void 0:e.previewCount}),b&&(0,a.createElement)(f,{callback:async function(e,t){const n={...h};n[e]=t,v(n),y.data.siteFeatures={...n},N(y)},selectedItems:h,customItemsList:b}))}}}]);