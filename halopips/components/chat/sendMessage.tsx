"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/action/sendMessage";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  content: z.string().min(1),
});

const SendMessage = (id: { sessionId: string; chatId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    sendMessage(values, id.sessionId, id.chatId);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <div className="grow">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem
                className="
              bg-white rounded-sm"
              >
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
};

export default SendMessage;
