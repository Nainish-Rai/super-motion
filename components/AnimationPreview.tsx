"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Play, Clock, CheckCircle, XCircle } from "lucide-react";

type AnimationStatus =
  | "idle"
  | "pending"
  | "rendering"
  | "completed"
  | "failed";

export function AnimationPreview() {
  // Placeholder state - will be managed by parent component later
  const status = "idle" as AnimationStatus;
  const videoUrl: string | null = null;

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
      case "rendering":
        return <Clock className="w-5 h-5 animate-spin" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Play className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "pending":
        return "Queued for processing...";
      case "rendering":
        return "Generating animation...";
      case "completed":
        return "Animation ready!";
      case "failed":
        return "Animation failed to generate";
      default:
        return "No animation in progress";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Animation Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Section */}
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>

        {/* Video Preview Section */}
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-full h-full rounded-lg"
              poster="/placeholder-thumbnail.jpg"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="text-center text-gray-500">
              <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Animation preview will appear here</p>
            </div>
          )}
        </div>

        {/* Download Section */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            disabled={status !== "completed" || !videoUrl}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Animation
          </Button>

          {status === "completed" && (
            <p className="text-xs text-gray-500 text-center">
              MP4 format • Ready for download
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
