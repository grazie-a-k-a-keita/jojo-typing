import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CircleCheck } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function UpdateDialog({
  isOpen,
  setIsOpen,
  success,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  success: boolean;
}) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新結果</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='flex items-center'>
          <CircleCheck className='mr-4 text-green-500' />
          <p className='text-lg font-semibold'>
            {success ? '更新に成功しました' : '更新に失敗しました'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
