import { SiGithub } from '@icons-pack/react-simple-icons';
import { Button } from '../ui/button';

export default function Footer() {
  return (
    <header className='sticky top-full h-20 border-t'>
      <div className='container flex h-full items-center justify-end'>
        <Button size='icon' variant='ghost'>
          <SiGithub className='size-5' />
        </Button>
      </div>
    </header>
  );
}
