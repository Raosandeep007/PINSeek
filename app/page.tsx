"use client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SEARCH_BY_PINCODE,
  SEARCH_BY_POSTOFFICE,
} from "@/constants/analyticEvents";
import { useJune } from "@/hooks/useAnalytics";
import { Form, Formik } from "formik";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Yup from "yup";

const SearchCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <CardHeader className="text-start">
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </>
  );
};

export default function Home() {
  const router = useRouter();
  const { analytics } = useJune();

  useEffect(() => {
    const { userAgent, productSub } = navigator;
    if (analytics) {
      analytics.page("HOME_PAGE");
      analytics.identify(productSub, {
        userAgent,
      });
    }
  }, [analytics]);

  return (
    <section className="py-12 md:py-24 lg:py-32 text-white container px-4 md:px-6 flex flex-col items-center text-center mb-12 justify-center space-y-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <Logo />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Find Post Offices with Ease
        </h1>
        <p className="max-w-[600px] text-gray-400 md:text-xl">
          Quickly locate post offices and get detailed information.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card
          className={`bg-gray-900 border-gray-800 transition-all duration-300 hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/20`}
        >
          <SearchCard
            description="Enter your postal PIN code to find the nearest post office."
            title="Search by PIN Code"
          >
            <Formik
              initialValues={{ pincode: "" }}
              onSubmit={(e) => {
                analytics?.track(SEARCH_BY_PINCODE, {
                  pincode: e.pincode,
                });
                router.push(`/pincode?pincode=${e.pincode}`);
              }}
              validationSchema={Yup.object().shape({
                pincode: Yup.number().positive().integer().required("Required"),
              })}
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <fieldset
                    className="gap-3 flex flex-col"
                    disabled={isSubmitting}
                  >
                    <Input
                      type="number"
                      minLength={6}
                      placeholder="Enter PIN Code"
                      name="pincode"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pincode}
                    />
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </fieldset>
                </Form>
              )}
            </Formik>
          </SearchCard>
        </Card>
        <Card
          className={`bg-gray-900 border-gray-800 transition-all duration-300 hover:ring-2 hover:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/20`}
        >
          <SearchCard
            description=" Enter the name of the post office branch to get detailed information."
            title="Search by Post Office Name"
          >
            <Formik
              initialValues={{ postoffice: "" }}
              onSubmit={(e) => {
                analytics?.track(SEARCH_BY_POSTOFFICE, {
                  pincode: e.postoffice,
                });
                router.push(`/postoffice?postoffice=${e.postoffice}`);
              }}
              validationSchema={Yup.object().shape({
                postoffice: Yup.string().min(3).required("Required"),
              })}
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <fieldset
                    className="gap-3 flex flex-col"
                    disabled={isSubmitting}
                  >
                    <Input
                      type="text"
                      placeholder="Enter Post Office Name"
                      name="postoffice"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.postoffice}
                    />
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </fieldset>
                </Form>
              )}
            </Formik>
          </SearchCard>
        </Card>
      </div>
    </section>
  );
}
