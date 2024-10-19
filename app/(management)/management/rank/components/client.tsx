'use client';

import ManagementLogin from '@/components/common/management-login';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { updateRankInfo } from '@/lib/firebase';
import { useManagementState } from '@/providers/management-state';
import { RankInfo } from '@/types/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleArrowUp } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import AddDialog from './add-dialog';
import UpdateDialog from './update-dialog';

const FormSchema = z.object({
  rankInfos: z.array(
    z.object({
      docId: z.string(),
      minimumPoint: z.coerce.number(),
      rank: z.string(),
    })
  ),
});

export default function Client({ rankInfos }: { rankInfos: RankInfo[] }) {
  const { auth } = useManagementState();

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateDialogSuccess, setUpdateDialogSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { rankInfos: rankInfos },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'rankInfos',
  });

  const addList = (rankInfo: RankInfo) => {
    append(rankInfo);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const result = await updateRankInfo({ rankInfos: data.rankInfos });
    if (result) {
      setUpdateDialogSuccess(true);
      setUpdateDialogOpen(true);
    } else {
      setUpdateDialogSuccess(false);
      setUpdateDialogOpen(true);
    }
  };

  if (!auth) {
    return <ManagementLogin />;
  } else {
    return (
      <>
        <div className='sticky top-0 z-50 flex justify-between bg-background/95 py-8 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <p className='text-2xl font-bold'>ランク管理</p>
          <div className='space-x-4'>
            <Button form='update-rank-info' type='submit'>
              <CircleArrowUp className='mr-2 size-5' />
              更新
            </Button>
            <AddDialog addFunction={addList} />
          </div>
        </div>
        <Form {...form}>
          <form id='update-rank-info' onSubmit={form.handleSubmit(onSubmit)}>
            <Table className='mx-auto mb-16 max-w-4xl'>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>MinimumPoint</TableHead>
                  <TableHead>Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`rankInfos.${index}.minimumPoint`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`rankInfos.${index}.rank`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <UpdateDialog
              isOpen={updateDialogOpen}
              setIsOpen={setUpdateDialogOpen}
              success={updateDialogSuccess}
            />
          </form>
        </Form>
      </>
    );
  }
}
