"use client";
import { Loader } from "@/components/Loader";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  SEARCH_BY_PINCODE,
  SEARCH_BY_PINCODE_ERROR,
  SEARCH_BY_PINCODE_SUCCESS,
} from "@/constants/analyticEvents";
import { useJune } from "@/hooks/useAnalytics";
import { useGetPincodePlace } from "@/hooks/useGetPincodePlace";
import { Form, Formik } from "formik";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Loader2Icon, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import * as Yup from "yup";

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div>
      <p className="text-white/60">{title}</p>
      <p className="text-white">{value}</p>
    </div>
  );
};

const Pincode = () => {
  const { analytics } = useJune();
  const router = useRouter();
  const search = useSearchParams();
  const pincode = search.get("pincode") || "";

  const { data, error, isLoading } = useGetPincodePlace(
    {
      pincode,
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      shouldRetryOnError: false,
    }
  );

  const { message, data: postOffice } = data || {};

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (analytics && pincode) {
      if (data) {
        analytics.track(SEARCH_BY_PINCODE_SUCCESS, {
          pincode,
          data,
        });
      }
      if (error) {
        analytics.track(SEARCH_BY_PINCODE_ERROR, {
          pincode,
          error: error?.message,
        });
      }
    }
  }, [analytics, pincode, data, error]);

  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
        }}
        className="sticky top-0 left-0 right-0 origin-[0%] h-1.5 bg-white z-10"
      />

      <section className="w-full lg:p-10 md:p-10 p-4 min-h-dvh">
        <div className="flex flex-col justify-center space-y-6 ">
          <Formik
            initialValues={{ pincode }}
            onSubmit={(e) => {
              router.push(`/pincode?pincode=${e.pincode}`);
            }}
            validationSchema={Yup.object().shape({
              pincode: Yup.number().positive().integer().required("Required"),
            })}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="sticky top-3 z-10">
                <fieldset
                  className="flex items-center gap-4 w-full px-3"
                  disabled={isLoading}
                >
                  <Logo />
                  <Input
                    type="number"
                    minLength={6}
                    name="pincode"
                    placeholder="Search new pincode"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pincode}
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    {isLoading ? (
                      <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                    ) : (
                      <MapPin className="mr-2 h-4 w-4" />
                    )}
                    Search
                  </Button>
                </fieldset>
              </Form>
            )}
          </Formik>
          {isLoading && (
            <motion.div className="h-16 w-16 animate-pulse" layout key="loader">
              <Loader />
            </motion.div>
          )}
          {!isLoading && (
            <motion.h1
              key={message}
              layout
              initial={{
                opacity: 0,
                x: "-20px",
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
            >
              {error?.message}
            </motion.h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence initial={false}>
              {postOffice?.map(
                (
                  {
                    Block,
                    BranchType,
                    Circle,
                    Country,
                    DeliveryStatus,
                    District,
                    Division,
                    Name,
                    Pincode,
                    Region,
                    State,
                  },
                  i
                ) => {
                  return (
                    <motion.span
                      key={i}
                      layout
                      initial={{
                        opacity: 0,
                        y: "20px",
                        scale: 1.05,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.4,
                          ease: [0.42, 0, 0.58, 1],
                        },
                      }}
                      whileTap={{
                        scaleY: 1.15,
                        scaleX: 1.05,
                        rotate: 1,
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                        transition: {
                          duration: 0.15,
                          ease: "easeOut",
                        },
                        zIndex: 1,
                      }}
                    >
                      <Card
                        role="button"
                        autoFocus
                        className={`bg-gray-900 border-gray-800 transition-all duration-300 hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/20 select-none group`}
                      >
                        <CardHeader className="text-white">
                          <CardTitle className="flex items-center gap-3">
                            <MapPin className="group-hover:text-pink-400 group-hover:scale-150 group-hover:rotate-360 transition-all duration-500" />
                            <span className="text-xl font-semibold">
                              {Name}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-y-4 gap-x-6">
                          <InfoItem title="Branch Type:" value={BranchType} />
                          <InfoItem
                            title="Delivery Status:"
                            value={DeliveryStatus}
                          />
                          <InfoItem title="Circle:" value={Circle} />
                          <InfoItem title="District:" value={District} />
                          <InfoItem title="Division:" value={Division} />
                          <InfoItem title="Region:" value={Region} />
                          <InfoItem title="Block:" value={Block} />
                          <InfoItem title="State:" value={State} />
                          <InfoItem title="Country:" value={Country} />
                          <InfoItem title="Pincode:" value={Pincode} />
                        </CardContent>
                      </Card>
                    </motion.span>
                  );
                }
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Pincode />
    </Suspense>
  );
}
