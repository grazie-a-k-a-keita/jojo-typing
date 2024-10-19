'use client';

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
import { login } from '@/lib/firebase';
import { useManagementState } from '@/providers/management-state';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function ManagementLogin() {
  const { setAuth } = useManagementState();
  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const loginResult = await login({ userName: data.username, password: data.password });
    if (loginResult) {
      setAuth(true);
    } else {
      console.error('ログインに失敗しました');
    }
  };

  return (
    <Form {...form}>
      <form
        className='mx-auto my-16 max-w-xl space-y-8 rounded-md border p-12 shadow-xl'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input {...field} autoComplete='off' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <div className='relative'>
                <FormControl className='pr-10'>
                  <Input autoComplete='off' type={visible ? 'text' : 'password'} {...field} />
                </FormControl>
                <Button
                  className='absolute right-1 top-1 size-8 text-muted-foreground'
                  onClick={() => setVisible((v) => !v)}
                  size='icon'
                  type='button'
                  variant='ghost'
                >
                  {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit'>
          <LogIn className='mr-2 size-5' />
          ログイン
        </Button>
      </form>
    </Form>
  );
}
