
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ArrowRight, ArrowLeft, ThumbsUp } from "lucide-react";
import {
    fitnessFormSchema,
    FitnessFormValues,
    FitnessOnboardingFormProps
} from "@/features/chat/types/fitnessOnBoardingType";
import { FormProvider, SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useState} from "react";
import {INITIAL_ON_BOARDING_FORM_DATA} from "@/features/chat/constants/fitnessOnBoard";


const FitnessOnboardingForm = ({ onSubmit }: FitnessOnboardingFormProps) => {
    const [step, setStep] = useState<"name" | "details" | "overview">(
        "name"
    );

    // Initialize form with React Hook Form and Zod validation
    const methods = useForm<FitnessFormValues>({
        resolver: zodResolver(fitnessFormSchema),
        defaultValues: INITIAL_ON_BOARDING_FORM_DATA,
        mode: "onChange"
    });

    const {
        control,
        handleSubmit,
        trigger,
        getValues,
    } = methods;

    const handlePersonalInfoSubmit = async () => {
        // Validate only the personal info fields
        const result = await trigger(["name", "age", "gender", "weight"]);
        if (result) {
            setStep("details");
        }
    };

    const handleDetailsSubmit = async () => {
        // Validate all fields
        const result = await trigger();
        if (result) {
            setStep("overview");
        }
    };

    const handleFinalSubmit: SubmitHandler<FitnessFormValues> = (data) => {
        // Format the data as a clear message for the AI
        const formattedData = {
            ...data,
            message: `Hi, I'm ${data.name}, and I'm ${data.age} years old. I am a ${
                data.gender
            } and weight ${data.weight} kg. My fitness level is ${
                data.fitnessLevel
            }, and my goal is ${data.fitnessGoal}. ${
                data.healthAndPhysicalCapacity
                    ? `I have the following physical limitations: ${data.healthAndPhysicalCapacity}.`
                    : "I have no physical limitations."
            } I prefer working out at ${
                data.workoutAccess === "home" ? "home" : "the gym"
            }.`,
        };

        onSubmit(formattedData);
    };

    // Navigation handlers
    const goToPersonalInfo = () => setStep("name");
    const goToDetails = () => setStep("details");

    // Stepper component
    const Stepper = () => (
        <div className="flex items-center justify-center mb-6">
            <div className="flex items-center w-full max-w-md">
                {/* Step 1 */}
                <div className="relative flex flex-col items-center">
                    <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                            step === "name"
                                ? "bg-primary border-primary text-white"
                                : "bg-primary border-primary text-white"
                        }`}
                    >
                        {step === "name" ? "1" : <Check className="w-6 h-6" />}
                    </div>
                    <span className="text-xs mt-1">Personal Info</span>
                </div>

                {/* Connector 1 */}
                <div
                    className={`flex-1 h-1 mx-2 ${
                        step === "name" ? "bg-gray-300" : "bg-primary"
                    }`}
                ></div>

                {/* Step 2 */}
                <div className="relative flex flex-col items-center">
                    <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                            step === "details"
                                ? "bg-primary border-primary text-white"
                                : step === "overview"
                                    ? "bg-primary border-primary text-white"
                                    : "bg-gray-200 border-gray-300 text-gray-600"
                        }`}
                    >
                        {step === "overview" ? <Check className="w-6 h-6" /> : "2"}
                    </div>
                    <span className="text-xs mt-1">Fitness Profile</span>
                </div>

                {/* Connector 2 */}
                <div
                    className={`flex-1 h-1 mx-2 ${
                        step === "overview" ? "bg-primary" : "bg-gray-300"
                    }`}
                ></div>

                {/* Step 3 */}
                <div className="relative flex flex-col items-center">
                    <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                            step === "overview"
                                ? "bg-primary border-primary text-white"
                                : "bg-gray-200 border-gray-300 text-gray-600"
                        }`}
                    >
                        3
                    </div>
                    <span className="text-xs mt-1">Overview</span>
                </div>
            </div>
        </div>
    );

    const renderPersonalInfoStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <Stepper />
                <CardTitle>Welcome! Tell us about yourself.</CardTitle>
            </CardHeader>
            <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePersonalInfoSubmit();
                        }}
                        className="space-y-4"
                    >
                        <FormField
                            control={control}
                            name="name"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your name" />
                                    </FormControl>
                                    {error && <FormMessage>{error.message}</FormMessage>}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            placeholder="Enter your age"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your gender" />

                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight (kg)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            placeholder="Enter your weight in kg"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
            </CardContent>
        </Card>
    );

    const renderDetailsStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <Stepper />
                <CardTitle>
                    Hello, {getValues("name")}! Let&#39;s create your fitness profile
                </CardTitle>
            </CardHeader>
            <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleDetailsSubmit();
                        }}
                        className="space-y-4"
                    >
                        <FormField
                            control={control}
                            name="fitnessLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fitness Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your fitness level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="fitnessGoal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fitness Goal</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your fitness goal" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Building Muscle">
                                                Building Muscle
                                            </SelectItem>
                                            <SelectItem value="Losing Fat">Losing Fat</SelectItem>
                                            <SelectItem value="Improve endurance">
                                                Improve Endurance
                                            </SelectItem>
                                            <SelectItem value="General Fitness">
                                                General Fitness
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="healthAndPhysicalCapacity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Physical Limitations</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Any injuries or limitations?"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="workoutAccess"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workout Preference</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Where do you prefer to workout?" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="home">Home</SelectItem>
                                            <SelectItem value="gym">Gym</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-2 mt-4">
                            <Button
                                type="button"
                                className="flex-1"
                                variant="outline"
                                onClick={goToPersonalInfo}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button type="submit" className="flex-1">
                                Review <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
            </CardContent>
        </Card>
    );

    const renderOverviewStep = () => {
        const formData = getValues();

        const genderDisplay = {
            male: "Male",
            female: "Female",
            other: "Other",
        }[formData.gender] || formData.gender;

        const fitnessLevelDisplay = {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
        }[formData.fitnessLevel] || formData.fitnessLevel;

        const workoutAccessDisplay = {
            home: "Home",
            gym: "Gym",
        }[formData.workoutAccess] || formData.workoutAccess;

        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <Stepper />
                    <CardTitle>Review Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-2">
                                Personal Information
                            </h3>
                            <dl className="grid grid-cols-2 gap-2">
                                <dt className="text-sm text-gray-600">Name:</dt>
                                <dd className="text-sm font-medium">{formData.name}</dd>

                                <dt className="text-sm text-gray-600">Age:</dt>
                                <dd className="text-sm font-medium">{formData.age}</dd>

                                <dt className="text-sm text-gray-600">Gender:</dt>
                                <dd className="text-sm font-medium">{genderDisplay}</dd>

                                <dt className="text-sm text-gray-600">Weight:</dt>
                                <dd className="text-sm font-medium">{formData.weight} kg</dd>
                            </dl>
                            <Button
                                type="button"
                                variant="ghost"
                                className="mt-2 h-auto p-0 text-primary text-sm"
                                onClick={goToPersonalInfo}
                            >
                                Edit Personal Information
                            </Button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-2">Fitness Profile</h3>
                            <dl className="grid grid-cols-2 gap-2">
                                <dt className="text-sm text-gray-600">Fitness Level:</dt>
                                <dd className="text-sm font-medium">{fitnessLevelDisplay}</dd>

                                <dt className="text-sm text-gray-600">Fitness Goal:</dt>
                                <dd className="text-sm font-medium">{formData.fitnessGoal}</dd>

                                <dt className="text-sm text-gray-600">Physical Limitations:</dt>
                                <dd className="text-sm font-medium">
                                    {formData.healthAndPhysicalCapacity || "None specified"}
                                </dd>

                                <dt className="text-sm text-gray-600">Workout Preference:</dt>
                                <dd className="text-sm font-medium">{workoutAccessDisplay}</dd>
                            </dl>
                            <Button
                                type="button"
                                variant="ghost"
                                className="mt-2 h-auto p-0 text-primary text-sm"
                                onClick={goToDetails}
                            >
                                Edit Fitness Profile
                            </Button>
                        </div>

                            <form onSubmit={handleSubmit(handleFinalSubmit)}>
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        type="button"
                                        className="flex-1"
                                        variant="outline"
                                        onClick={goToDetails}
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                        Confirm <ThumbsUp className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <FormProvider {...methods}>
            {step === "name" && renderPersonalInfoStep()}
            {step === "details" && renderDetailsStep()}
            {step === "overview" && renderOverviewStep()}
        </FormProvider>
    );
};

export default FitnessOnboardingForm;

