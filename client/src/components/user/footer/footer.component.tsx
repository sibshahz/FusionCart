import { FC } from "react";
import LayoutContainer from "../layout-container/laytout-container.component";
import Link from "next/link";
import { MainNav,HelpNav } from "@/src/utils/user/navigations";
interface IProps {};

export const Footer: FC<IProps> = (props) => {
  return (
      <LayoutContainer>
          
        <div className="footer-container font-poppins">
          <div className="grid grid-flow-col">
            <div className="footer--branding-container">
              <h4 className="text-gray-5 font-medium text-base mb-14">Furniro</h4>
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
            </div>
          </div>
        </div>
        <div className="footer--rights-bar border-t border-border-gray">
          <p className="pt-8 pb-8 font-normal">
            2024 Furniro. All rights reserved by <Link href="https://github.com/sibshahz">Shahid Gillani</Link>
          </p>
        </div>
          
      </LayoutContainer>
  );
}
