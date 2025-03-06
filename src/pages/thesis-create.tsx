import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/use-toast";
import { getThesis, postThesis } from "@/api/thesis";
import { useAuth } from "@/context/auth-provider";

const formSchema = z.object({
  topicName: z.string().min(5, {
    message: "Topic name must be at least 5 characters.",
  }),
  mainArea: z.string().min(1, {
    message: "Main area is required.",
  }),
  secondaryArea: z.string().optional(),
  personalInterest: z.number().min(1).max(5),
  businessPotential: z.number().min(1).max(5),
  openSourceContribution: z.number().min(1).max(5),
  scientificValue: z.number().min(1).max(5),
  topicDescription: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  externalLinks: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

const researchAreas = [
  "Artificial Intelligence",
  "Machine Learning",
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
  "Human-Computer Interaction",
  "Computer Networks",
  "Computer Graphics",
  "Robotics",
  "Bioinformatics",
  "Natural Language Processing",
  "Computer Vision",
  "Distributed Systems",
  "Cloud Computing",
  "Internet of Things",
  "Blockchain",
  "Quantum Computing",
  "Virtual Reality",
  "Augmented Reality",
  "Mobile Computing",
];

export default function ThesisFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(id ? true : false);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topicName: "",
      mainArea: "",
      secondaryArea: "",
      personalInterest: 3,
      businessPotential: 3,
      openSourceContribution: 3,
      scientificValue: 3,
      topicDescription: "",
      externalLinks: "",
    },
  });

  useEffect(() => {
    async function fetchThesis() {
      if (!id) return;

      try {
        const token = localStorage.getItem("token") as string;
        const thesis = await getThesis(id, token);

        if (thesis) {
          form.reset({
            topicName: thesis.topicName,
            mainArea: thesis.mainArea,
            secondaryArea: thesis.secondaryArea,
            personalInterest: thesis.personalInterest,
            businessPotential: thesis.businessPotential,
            openSourceContribution: thesis.openSourceContribution,
            scientificValue: thesis.scientificValue,
            topicDescription: thesis.topicDescription,
            externalLinks: thesis.externalLinks,
          });
        } else {
          toast({
            title: "Thesis not found",
            description: "The requested thesis could not be found.",
            variant: "destructive",
          });
          navigate("/theses");
        }
      } catch (error) {
        console.error("Error fetching thesis:", error);
        toast({
          title: "Error",
          description: "Failed to load thesis data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchThesis();
  }, [id, navigate, toast, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    try {
      const newThesis = await postThesis(values, token, user._id);
      if (!newThesis._id) {
        toast({
          title: "Error",
          description: "Creation of thesis not succesfull!",
        });
      }
    } catch (error) {
      const typedError = error as Error;
      toast({
        title: "Error during creating thesis!",
        description: `The error is ${typedError.message}`,
      });
      return;
    }

    toast({
      title: id ? "Thesis updated" : "Thesis created",
      description: id
        ? "Your thesis has been successfully updated."
        : "Your thesis has been successfully created.",
    });

    navigate("/theses");
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading thesis data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {id ? "Edit Thesis" : "Create New Thesis"}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topicName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter thesis topic name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The main title of your research thesis.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="mainArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Research Area</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select main research area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {researchAreas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The primary field of your research.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Research Area (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select secondary area (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {researchAreas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      A secondary field related to your research (if
                      applicable).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="personalInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Interest (1-5)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                        <div className="text-center font-medium">
                          Current value: {field.value}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      How interested are you in this topic personally?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessPotential"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Potential (1-5)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                        <div className="text-center font-medium">
                          Current value: {field.value}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      How would you rate the business potential of this
                      research?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openSourceContribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Source Contribution (1-5)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                        <div className="text-center font-medium">
                          Current value: {field.value}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      How much could this contribute to open source projects?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scientificValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scientific Value (1-5)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                        <div className="text-center font-medium">
                          Current value: {field.value}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      How would you rate the scientific value of this research?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="topicDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your thesis topic in detail..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of your research topic.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="externalLinks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Links</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/relevant-resource"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add relevant external resources or references (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/theses")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {id ? "Update Thesis" : "Create Thesis"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
