"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import IndiaPost from "@/public/icons/india-post.svg";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Logo } from "@/components/Logo";

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
    <Card className="text-white/80 bg-white/10 text-white rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-3">
            <SearchIcon />
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        </CardTitle>
        <CardDescription className="text-white/80">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default function Home() {
  const router = useRouter();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Logo />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Find Your Post Office
                </h1>
              </div>
              <p className="max-w-[600px] md:text-lg text-white/80">
                Search by PIN code or branch name to get details.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SearchCard
                description="Enter your postal PIN code to find the nearest post office."
                title="Search by PIN Code"
              >
                <Formik
                  initialValues={{ pincode: "" }}
                  onSubmit={(e) => {
                    router.push(
                      `/pincode?pincode=${e.pincode}
                      `
                    );
                  }}
                  validationSchema={Yup.object().shape({
                    pincode: Yup.number()
                      .positive()
                      .integer()
                      .required("Required"),
                  })}
                >
                  {({ values, handleChange, handleBlur, isSubmitting }) => (
                    <Form className="gap-3 flex flex-col">
                      <Input
                        type="number"
                        minLength={6}
                        placeholder="Enter PIN Code"
                        name="pincode"
                        className="bg-white/10 text-white placeholder:text-white/60 focus:ring-0 focus:border-white"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pincode}
                      />
                      <Button loading={isSubmitting} disabled={isSubmitting}>
                        Find Post Office
                      </Button>
                    </Form>
                  )}
                </Formik>
              </SearchCard>
              <SearchCard
                description=" Enter the name of the post office branch to get detailed
                    information."
                title="Search by Post Office Name"
              >
                <Formik
                  initialValues={{ postoffice: "" }}
                  onSubmit={(e) => {
                    router.push(
                      `/postoffice?postoffice=${e.postoffice}
                      `
                    );
                  }}
                  validationSchema={Yup.object().shape({
                    postoffice: Yup.string().min(3).required("Required"),
                  })}
                >
                  {({ values, handleChange, handleBlur, isSubmitting }) => (
                    <Form className="gap-3 flex flex-col">
                      <Input
                        type="text"
                        placeholder="Enter Post Office Name"
                        name="postoffice"
                        className="bg-white/10 text-white placeholder:text-white/60 focus:ring-0 focus:border-white"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postoffice}
                      />
                      <Button loading={isSubmitting} disabled={isSubmitting}>
                        Find Post Office
                      </Button>
                    </Form>
                  )}
                </Formik>
              </SearchCard>
            </div>
          </div>
          <Image
            src={IndiaPost}
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
