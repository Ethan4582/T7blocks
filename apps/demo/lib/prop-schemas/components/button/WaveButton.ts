export const waveButtonSchema={
   label:{
    type:"text" as const,
    label:"Label",
    default:"Get Started"
   },
   bgColor:{
    type:"text" as const,
    label:"Background Color",
    default:"#ffffff"
   },
   hoverBgColor:{
    type:"text" as const,
    label:"Hover Background Color",
    default:"#ff0000ff"
   },
   animationDuration:{
    type:"number" as const,
    label:"Animation Duration",
    default:500
   },
   width:{
    type:"number" as const,
    label:"Width",
    default:168
   },
   height:{
    type:"number" as const,
    label:"Height",
    default:52
   },
}