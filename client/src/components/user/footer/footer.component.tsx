import { FC } from "react";
import LayoutContainer from "../layout-container/laytout-container.component";
import Link from "next/link";
import { MainNav,HelpNav } from "@/src/utils/user/navigations";
interface IProps {};

export const Footer: FC<IProps> = (props) => {
  return (
      <LayoutContainer>
        <div className="footer-container font-poppins mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            <div className="footer--branding-container">
              <h4 className="text-black font-bold text-2xl mb-12 leading-normal">Furniro</h4>
              <p className="font-base text-gray-5 font-normal w-3/4">400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
            </div>
            <div className="footer--nav-container links">
              <h4 className="text-gray-5 font-medium text-base mb-14">Links</h4>
              <div className='flex flex-col gap-x-16 gap-y-2 mb-3'>
                {
                  MainNav.map((item,index) => {
                    return(
                      <Link
                        key={`nav-item-${index}`} 
                        href={item.url} 
                        className=
                          'bg-gray-2 mb-8 text-black font-medium text-base'>
                        {item.title}
                      </Link>
                    )
                  })
                  
                }
              </div>
            </div>
            <div className="footer--nav-container help">
              <h4 className="text-gray-5 font-medium text-base mb-14">Help</h4>
              <div className='flex flex-col gap-x-16 gap-y-2 mb-3'>
                {
                  HelpNav.map((item,index) => {
                    return(
                      <Link
                        key={`nav-item-${index}`} 
                        href={item.url} 
                        className=
                          'bg-gray-2 mb-8 text-black font-medium text-base'>
                        {item.title}
                      </Link>
                    )
                  })
                  
                }
              </div>
            </div>
            <div className="footer--subscriber-container">
              <h4 className="text-gray-5 font-medium text-base mb-14">Newsletter</h4>
              <div className="flex flex-row gap-2 shrink flex-wrap">
                <input 
                  type="text" 
                  placeholder="Enter Your Email Address" 
                  className="border-solid border-b 
                          border-black font-normal 
                            text-sm leading-normal 
                            text-gray-5 focus:ring-0 p-1 pr-5" 
                />
                <button 
                  className="border-solid border-b 
                          border-black font-medium 
                            text-sm leading-normal" 
                  type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer--rights-bar border-t border-border-gray mt-12">
          <p className="pt-8 pb-8 font-normal">
            2024 Furniro. All rights reserved by <Link href="https://github.com/sibshahz">Shahid Gillani</Link>
          </p>
        </div>
          
      </LayoutContainer>
  );
}
