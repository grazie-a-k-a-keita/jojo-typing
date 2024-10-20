'use client';

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
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createRankInfo } from '@/lib/firebase';
import { RankInfo } from '@/types/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleFadingPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  minimumPoint: z.coerce.number(),
  rank: z.string(),
});

export default function ResultRegisterDialog({
  addFunction,
}: {
  addFunction: (rankInfo: RankInfo) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      minimumPoint: 0,
      rank: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await createRankInfo({ rankInfo: data });
    addFunction(response);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='lg'>
          <CircleFadingPlus className='mr-2 size-5' />
          記録を登録
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle>ランクの追加</AlertDialogTitle>
              <AlertDialogDescription>ランクの情報を入力してください</AlertDialogDescription>
            </AlertDialogHeader>
            <div className='space-y-4 py-8'>
              <FormField
                control={form.control}
                name='minimumPoint'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MinimumPoint（最低ポイント）</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rank'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rank（ランク）</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type='submit'>追加する</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
