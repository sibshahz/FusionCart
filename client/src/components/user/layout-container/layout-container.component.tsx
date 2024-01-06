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
      className="p-5 flex justify-center items-center">    
        <div className="flex-1 max-w-8xl">  
        {children}
        </div>
    </div>

  )
}

export default LayoutContainer