"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnimationForm() {
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsSubmitting(true);

    // TODO: Implement API call to /api/animations
    console.log("Submitting prompt:", prompt);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // TODO: Handle response and update preview
    }, 1000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Create Animation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Animation Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the animation you want to create..."
              className="w-full h-40 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            disabled={!prompt.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Creating Animation..." : "Generate Animation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
