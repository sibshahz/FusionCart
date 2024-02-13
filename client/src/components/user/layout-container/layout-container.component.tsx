import React,{FC} from 'react'

const LayoutContainer = ({
  children,
  bg,
}: {
  children: React.ReactNode,
  bg:string
}) => {
  return (
    <div
      style={{ 
        backgroundColor:bg
       }} 
      className="px-5 flex justify-center items-center">    
        <div className="flex-1 max-w-8xl w-full">  
        {children}
        </div>
    </div>

  )
}

export default LayoutContainer