import React,{FC} from 'react'

const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
    <div className="pl-5 pr-5 flex justify-center items-center">    
        <div className="flex-1 max-w-8xl">  
        {children}
        </div>
    </div>
    </>
  )
}

export default LayoutContainer