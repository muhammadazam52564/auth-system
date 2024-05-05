import { ReactElement, useState } from "react";
export const  useMultiStepForm = (steps: { title: string, heading: string, description: string, nextBtnTitle?: string, Element: ReactElement}[]) => {
    const [currentStepIndex, setcurrentStepIndex] = useState(0)


    const next = () =>{
        setcurrentStepIndex((prev)=> {
            if(prev >= steps.length - 1) return prev
            return prev + 1
        })
    }

    const back = () =>{
        setcurrentStepIndex((prev)=> {
            if(prev <= 0) return prev
            return prev - 1
        })
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        firstStep: currentStepIndex === 0,
        lastStep: currentStepIndex === steps.length-1,
        next,
        back
    }
} 