'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="ghost"
        onClick={() => setTheme('dark')}
      >
        Dark
      </Button>
      <Button
        variant="link"
        onClick={() => setTheme('light')}
      >
        Light
      </Button>
      <Button
        variant="link"
        onClick={() => setTheme('solarized')}
      >
        Solarized
      </Button>
      <Button
        variant="link"
        onClick={() => setTheme('dark-dimmed')}
      >
        Dark dimmed
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
