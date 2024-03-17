'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { ChevronDown, X } from 'lucide-react';
import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { v4 as uuiv4 } from 'uuid';

import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

type OptionType = {
  id: string;
  label: string;
};

type TTProps = {
  value?: OptionType[];
  options: OptionType[];
  onChange?: (options: OptionType[]) => void;
  creatable?: boolean;
  placeholder?: string;
};

const MultiSelect = ({ value, options, creatable, onChange, placeholder }: TTProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState<OptionType[]>(value || []);
  const t = useScopedI18n('multiSelect');

  const handleUnselect = useCallback(
    (option: OptionType) => {
      const newOptions = selected.filter((s) => s.id !== option.id);
      setSelected(newOptions);
      onChange?.(newOptions);
    },
    [selected]
  );

  const selectables = options.filter((val) => !selected.find((p) => p.id === val.id));

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '' && selected.length > 0) {
            handleUnselect(selected[selected.length - 1]);
          }
        }

        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [selected]
  );

  const CreatableItem = () => {
    if (!creatable) return undefined;

    const Item = (
      <CommandItem
        value={inputValue}
        className="cursor-pointer"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSelect={(value: string) => {
          setInputValue('');
          const newOptions = [
            ...selected,
            { id: uuiv4(), label: value.charAt(0).toUpperCase() + value.slice(1) },
          ];
          setSelected(newOptions);
          onChange?.(newOptions);
        }}
      >{`${t('create')} "${inputValue}"`}</CommandItem>
    );

    if (
      inputValue.length > 0 &&
      !selectables.some((option) => option.label.toLowerCase() === inputValue.toLowerCase())
    ) {
      return Item;
    }

    return undefined;
  };

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex w-full flex-wrap items-center gap-1">
          {selected.map((option) => {
            return (
              <Badge key={option.id} variant="secondary">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            placeholder={placeholder}
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="ml-2 w-full flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </div>
      <div className="relative mt-3">
        {open && (
          <CommandList
            className={cn(
              'absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
              {
                'animate-in fade-in-0 zoom-in-95': open,
              }
            )}
          >
            <CommandEmpty>{t('emptyTitle')}</CommandEmpty>
            {CreatableItem()}

            <CommandGroup>
              {selectables.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.label}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={(label) => {
                    setInputValue('');
                    const newOptions = [...selected, { id: option.id, label }];
                    setSelected(newOptions);
                    onChange?.(newOptions);
                  }}
                  className="cursor-pointer"
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
