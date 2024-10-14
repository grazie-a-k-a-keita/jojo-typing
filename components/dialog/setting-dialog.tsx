'use client';

import { DelaGothicOne } from '@/components/font/fonts';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { buttonClick } from '@/lib/sounds';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Music2, Settings } from 'lucide-react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const items = [
  {
    id: 'bgm',
    label: 'BGM',
  },
  {
    id: 'sound-effects',
    label: '効果音',
  },
  {
    id: 'type-sound',
    label: 'タイプ音',
  },
  {
    id: 'miss-sound',
    label: 'ミス音',
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()),
});

export default function SettingDialog({ children }: { children: ReactNode }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='w-full' onClick={() => buttonClick.play()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='border-b'>
          <AlertDialogTitle>
            <div className='flex items-center'>
              <Settings className='mr-2 size-6' />
              <span className={cn(DelaGothicOne.className, 'tracking-widest')}>
                タイピングの設定
              </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            className='space-y-8 px-4'
            id='settings-form'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='items'
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      control={form.control}
                      key={item.id}
                      name='items'
                      render={({ field }) => {
                        return (
                          <FormItem
                            className='flex flex-row items-center space-x-3 space-y-0'
                            key={item.id}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                className='size-6'
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='flex items-center text-base font-medium'>
                              <Music2 className='mr-1 size-4' />
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => buttonClick.play()}>キャンセル</AlertDialogCancel>
          <AlertDialogAction form='settings-form' onClick={() => buttonClick.play()} type='submit'>
            設定を変更する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
