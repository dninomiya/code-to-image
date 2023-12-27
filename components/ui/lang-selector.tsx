'use client';

import { bundledLanguagesInfo } from 'shikiji/bundle/web';
import { useApp } from '@/app/providers/app-provider';
import { Button } from '@/components/ui/button';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// export function LangSelector() {
//   const { lang, setLang } = useApp();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" className="rounded-full">
//           {bundledLanguagesInfo.find((item) => item.id === lang)?.name}
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="max-h-96">
//         {bundledLanguagesInfo.map((item) => (
//           <DropdownMenuItem key={item.id} onClick={() => setLang(item.id)}>
//             {item.name}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LangSelector() {
  const { lang, setLang } = useApp();

  return (
    <Select defaultValue={lang} onValueChange={(v) => setLang(v)}>
      <SelectTrigger className="w-32 rounded-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {bundledLanguagesInfo.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
