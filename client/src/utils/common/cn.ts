import {twMerge} from 'tailwind-merge'
import {clsx,ClassValue} from 'clsx'

export function cn(...inputs:ClassValue[]){
  return twMerge(clsx(inputs))
}

//example usage

// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

// export default function Button({className,...props}:ButtonProps){
//   const [pending,setPending]=useState(false);

//   return(
//     <button
//       className={cn(
//         "bg-blue-500 py-2 px-4",
//         className,
//         {
//           "bg-gray-500": pending,
//         }
//       )}
//       {...props}
//     >
//       Submit
//     </button>
//   )
// }