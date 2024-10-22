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
import { createResultInfo } from '@/lib/firebase';
import { useResultState } from '@/providers/result-state';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleFadingPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  playerName: z.string(),
});

export default function ResultRegisterDialog() {
  const { correctTypeCount, missTypeCount, typeSpeed, score } = useResultState();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      playerName: 'Guest',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createResultInfo({
      mode: 'character',
      playerName: data.playerName,
      successTypeCount: correctTypeCount,
      missTypeCount,
      typeSpeed,
      point: score.point,
    });
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
              <AlertDialogTitle>プレイ記録の登録</AlertDialogTitle>
              <AlertDialogDescription>全体のランキングに反映されます</AlertDialogDescription>
            </AlertDialogHeader>
            <div className='space-y-4 py-8'>
              <FormField
                control={form.control}
                name='playerName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>登録するプレイヤー名</FormLabel>
                    <FormControl>
                      <Input {...field} onFocus={(e) => e.target.select()} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type='submit'>登録する</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
