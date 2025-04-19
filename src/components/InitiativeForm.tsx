"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InitiativeFormProps {
  addInitiative: (initiative: { name: string; value: number; complexity: number }) => void;
  clearInitiatives: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Initiative name must be at least 2 characters." }),
  value: z.coerce.number().min(1).max(9),
  complexity: z.coerce.number().min(1).max(9),
});

const InitiativeForm: React.FC<InitiativeFormProps> = ({ addInitiative, clearInitiatives }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: 5,
      complexity: 5,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addInitiative(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initiative Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter initiative name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Value (1-9)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1-9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complexity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complexity (1-9)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1-9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">Add Initiative</Button>
          <Button type="button" variant="destructive" onClick={clearInitiatives}>
            Clear Initiatives
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InitiativeForm;
