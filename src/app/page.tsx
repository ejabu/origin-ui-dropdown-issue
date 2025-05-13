"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SelectWithSearch } from "@/components/select-with-search";

const FormSchema = z.object({
  framework: z.string({
    required_error: "Please select a framework.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  customFramework: z.string().optional(),
});

export default function Page() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {
    setOpen(false);
  }

  // Handle opening the dialog from dropdown item
  const handleOpenDialog = (e: Event) => {
    e.preventDefault();
    // Close dropdown first, then open dialog
    setDropdownOpen(false);
    // Small delay to ensure dropdown is closed before dialog opens
    setTimeout(() => {
      setOpen(true);
    }, 10);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 gap-8">
      {/* 1st Section */}
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-green-600">1. Working Sample ✅</h2>
        <p>We can scroll easily using mouse wheel or trackpad</p>
        <SelectWithSearch />
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-red-600">2. Buggy Sample ❗</h2>
        <p>We can not scroll easily using mouse wheel or trackpad when dropdown is inside the Modal</p>
        <br />
        <p>Please follow these steps:</p>
        <p>
          <ul className="list-decimal">
						<li>click Open Dropdown</li>
						<li>click Open Modal</li>
					</ul>
        </p>
        <br />
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onSelect={handleOpenDialog}>Open Modal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Buggy Dropdown</DialogTitle>
              <DialogDescription>Try to open and scroll this dropdown</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="customFramework"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Origin UI - Overflow Dropdown</FormLabel>
                      <FormControl>
                        <div className="mt-1">
                          <SelectWithSearch value={field.value ?? "-"} onChange={(value) => field.onChange(value)} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The dropdown is not scrollable using Mouse Wheel or Trackpad.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button>Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
