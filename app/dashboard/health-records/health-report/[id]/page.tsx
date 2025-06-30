import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  FileText,
  Heart,
  Info,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default async function HealthReportDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params in Next.js 15
  const { id } = await params;
  
  // Mock data - in a real app, you would fetch this data based on the ID
  const report = {
    id: id,
    date: "2023-05-10T09:15:00Z",
    status: "Completed",
    summary:
      "Your health check results are within normal ranges. You are eligible to donate blood.",
    eligibility: "Eligible",
    nextEligibleDate: "2023-07-10T00:00:00Z",
    doctor: "Dr. Kamruzzaman",
    facility: "City Hospital Blood Center",
    bloodTests: [
      {
        name: "Hemoglobin",
        value: "14.2 g/dL",
        range: "13.5-17.5 g/dL",
        status: "Normal",
      },
      { name: "Hematocrit", value: "42%", range: "38.8-50%", status: "Normal" },
      {
        name: "Iron",
        value: "80 μg/dL",
        range: "65-175 μg/dL",
        status: "Normal",
      },
      {
        name: "White Blood Cells",
        value: "7.2 x10^9/L",
        range: "4.5-11.0 x10^9/L",
        status: "Normal",
      },
      {
        name: "Platelets",
        value: "250 x10^9/L",
        range: "150-450 x10^9/L",
        status: "Normal",
      },
    ],
    vitalSigns: [
      {
        name: "Blood Pressure",
        value: "120/80 mmHg",
        range: "<140/90 mmHg",
        status: "Normal",
      },
      { name: "Pulse", value: "72 bpm", range: "60-100 bpm", status: "Normal" },
      {
        name: "Temperature",
        value: "98.6°F",
        range: "97.8-99.1°F",
        status: "Normal",
      },
      { name: "Weight", value: "165 lbs", status: "Normal" },
    ],
    recommendations: [
      "Continue with a balanced diet rich in iron",
      "Stay hydrated, especially before donation",
      "Maintain regular exercise routine",
      "Schedule your next donation after July 10, 2023",
    ],
  };

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate days until next eligible date
  const calculateDaysUntil = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysUntilEligible = calculateDaysUntil(report.nextEligibleDate);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/notifications">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Health Report Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Health Report</CardTitle>
                  <CardDescription>Report ID: {report.id}</CardDescription>
                </div>
                <Badge
                  className={
                    report.eligibility === "Eligible"
                      ? "bg-green-500"
                      : report.eligibility === "Temporarily Deferred"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }
                >
                  {report.eligibility}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Date:</span>
                <span>{formatDate(report.date)}</span>
                <Clock className="h-5 w-5 ml-4 text-gray-500" />
                <span>{formatTime(report.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Status:</span>
                <Badge variant="outline">{report.status}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Doctor:</span>
                <span>{report.doctor}</span>
              </div>

              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Facility:</span>
                <span>{report.facility}</span>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Summary</h3>
                <p className="text-gray-700">{report.summary}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  Next Eligible Donation Date
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>{formatDate(report.nextEligibleDate)}</span>
                    <span>{daysUntilEligible} days remaining</span>
                  </div>
                  <Progress
                    value={100 - (daysUntilEligible / 56) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/dashboard/requests">Find Blood Requests</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                Detailed blood test results and vital signs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="blood">
                <TabsList className="mb-4">
                  <TabsTrigger value="blood">Blood Tests</TabsTrigger>
                  <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                </TabsList>
                <TabsContent value="blood">
                  <div className="space-y-4">
                    {report.bloodTests.map((test, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <p className="text-sm text-gray-500">
                            Range: {test.range}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{test.value}</p>
                          <Badge
                            className={
                              test.status === "Normal"
                                ? "bg-green-500"
                                : test.status === "Low"
                                ? "bg-yellow-500"
                                : test.status === "High"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }
                          >
                            {test.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="vitals">
                  <div className="space-y-4">
                    {report.vitalSigns.map((vital, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{vital.name}</p>
                          {vital.range && (
                            <p className="text-sm text-gray-500">
                              Range: {vital.range}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{vital.value}</p>
                          <Badge
                            className={
                              vital.status === "Normal"
                                ? "bg-green-500"
                                : vital.status === "Low"
                                ? "bg-yellow-500"
                                : vital.status === "High"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }
                          >
                            {vital.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p>{recommendation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Blood Donor Nutrition Guide</p>
                  <p className="text-sm text-gray-500">
                    Tips for healthy eating
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Pre-Donation Checklist</p>
                  <p className="text-sm text-gray-500">
                    Prepare for your next donation
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Understanding Blood Tests</p>
                  <p className="text-sm text-gray-500">
                    Learn what your results mean
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Resources
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
