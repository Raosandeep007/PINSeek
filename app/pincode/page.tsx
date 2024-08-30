"use client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetPincodePlace } from "@/hooks/useGetPincodePlace";
import IndiaPost from "@/public/icons/india-post.svg";
import { Form, Formik } from "formik";
import { useScroll, motion, useSpring, AnimatePresence } from "framer-motion";
import { Locate, MapPin, Search } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div>
      <p className="text-white/60">{title}</p>
      <p>{value}</p>
    </div>
  );
};

const Pincode = () => {
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

  return (
    <>
      <motion.div
        style={{
          scaleX: scrollYProgress,
        }}
        className="sticky top-0 left-0 right-0 origin-[0%] h-2 bg-gradient-to-r from-red-400 to-green-500"
      />
      <section className="w-full lg:p-12 md:p-12 p-4">
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
              <Form className="flex items-center gap-4 w-full sticky top-3 px-3 z-10">
                <Logo />
                <div className="w-full rounded-lg bggradient-sand">
                  <Input
                    type="number"
                    minLength={6}
                    name="pincode"
                    placeholder="Search new pincode"
                    className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pincode}
                  />
                  <Button
                    type="submit"
                    className="absolute right-7 top-1/2 -translate-y-1/2"
                    size="icon"
                    variant="ghost"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    <Search />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {!isLoading && (
            <motion.h1
              key={message}
              layout
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white"
            >
              {error?.message}
            </motion.h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Card
                    key={i}
                    className="animate-pulse bg-white/30 border-none h-96"
                  ></Card>
                ))}
              </>
            )}
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
                      <Card className="text-white/80 bg-black/10 text-white rounded-lg shadow-lg select-none">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <MapPin />
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

export default Pincode;
