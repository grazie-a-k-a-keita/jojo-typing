'use client';

import { Button } from '@/components/ui/button';
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
import { RankInfo } from '@/types/firebase';
import { CircleArrowUp, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import UpdateDialog from './update-dialog';

export default function Client({ rankInfo }: { rankInfo: RankInfo[] }) {
  const [updateInfo, setUpdateInfo] = useState(rankInfo);

  // 更新ダイアログ
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateDialogSuccess, setUpdateDialogSuccess] = useState(false);

  return (
    <>
      <div className='sticky top-0 z-50 flex justify-between bg-background/95 py-8 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <p className='text-2xl font-bold'>Rank管理</p>
        <div className='space-x-4'>
          <Button
            onClick={async () => {
              const result = await updateRankInfo({
                rankInfos: updateInfo.filter(
                  (item) =>
                    !rankInfo.some(
                      (r) => r.minimumPoint === item.minimumPoint && r.rank === item.rank
                    )
                ),
              });
              if (result) {
                setUpdateDialogOpen(true);
                setUpdateDialogSuccess(true);
              } else {
                setUpdateDialogOpen(true);
                setUpdateDialogSuccess(false);
              }
            }}
          >
            <CircleArrowUp className='mr-2' />
            更新
          </Button>
          <Button>
            <CirclePlus className='mr-2' />
            追加
          </Button>
        </div>
      </div>
      <Table className='mx-auto mb-16 max-w-4xl'>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>MinimumPoint</TableHead>
            <TableHead>Rank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankInfo.map((item, index) => (
            <TableRow key={item.docId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Input
                  defaultValue={item.minimumPoint}
                  onChange={(e) => {
                    setUpdateInfo((prev) => {
                      prev[index].minimumPoint = Number(e.target.value);
                      return [...prev];
                    });
                  }}
                  type='number'
                />
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={item.rank}
                  onChange={(e) => {
                    setUpdateInfo((prev) => {
                      prev[index].rank = e.target.value;
                      return [...prev];
                    });
                  }}
                  type='text'
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
    </>
  );
}
