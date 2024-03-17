'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Loader from '@/components/shared/loader';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
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
import MultiSelect from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUserInfo } from '@/features/user/actions';
import { useUserInfoFormRoles, useUserInfoFormValidation } from '@/features/user/hooks';
import { UserInfoFormType } from '@/features/user/types';
import { initUserFormValues } from '@/features/user/utils/constants';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useScopedI18n } from '@/locales/client';

type UserInfoModalProps = {
  chiefs: {
    id: string;
    label: string;
  }[];
  users: {
    id: string;
    label: string;
  }[];
};

const UserInfoModal = ({ chiefs, users }: UserInfoModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const userInfoSchema = useUserInfoFormValidation();
  const user = useCurrentUser();
  const roles = useUserInfoFormRoles();
  const t = useScopedI18n('userInfoForm');

  const form = useForm<UserInfoFormType>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: initUserFormValues,
  });

  const onSubmit: SubmitHandler<UserInfoFormType> = (data) => {
    startTransition(async () => {
      const res = await updateUserInfo(data, user?.id as string);
      if (res.error) {
        toast.error(res.error || t('toast.error.title'));
      } else {
        toast.success(t('toast.success.title'));
        setIsOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-balance text-center">{t('title')}</h2>
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inputs.lastName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={`${t('placeholders.your')} ${t('inputs.lastName')}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="patronymic"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inputs.patronymic')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={`${t('placeholders.your')} ${t('inputs.patronymic')}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="position"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inputs.position')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={`${t('placeholders.your')} ${t('inputs.position')}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('inputs.role')}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => {
                        field.onChange(value);
                        form.setValue('chiefId', '');
                        form.setValue('employees', []);
                      }}
                      value={field.value}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${t('placeholders.your')} ${t('inputs.role')}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(roles).map(([key, value]) => (
                          <SelectItem value={key} key={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('role') === UserRole.EMPLOYEE && (
              <FormField
                name="chiefId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('inputs.chiefId')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`${t('placeholders.your')} ${t('inputs.chiefId')}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {chiefs.map((chief) => (
                            <SelectItem value={chief.id} key={chief.id}>
                              {chief.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch('role') === UserRole.CHIEF && (
              <FormField
                name="employees"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('inputs.employees')}</FormLabel>
                    <FormControl>
                      <MultiSelect
                        onChange={field.onChange}
                        placeholder={t('inputs.employees')}
                        options={users}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader /> : t('inputs.btn')}
            </Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserInfoModal;
