import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { signInAction } from "./action.server";

/* eslint-disable jsx-a11y/anchor-is-valid */
export const meta: MetaFunction = () => {
  return [{ title: "Login" }];
};

export async function action(args: ActionFunctionArgs) {
  return await signInAction(args);
}

export default function Login() {
  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1730026698575-e907419c9168?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
      <Form method="POST" className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <p className="mt-3 text-xl text-center text-gray-600 font-semibold ">
          Welcome back!
        </p>

        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600  "
            htmlFor="LoggingEmailAddress"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600  "
              htmlFor="loggingPassword"
            >
              Password
            </label>
            <a href="#" className="text-xs text-gray-500   hover:underline">
              Forget Password?
            </a>
          </div>

          <input
            id="password"
            name="password"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
          />
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Login
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>

          <a
            href="/register"
            className="text-xs text-gray-500 uppercase  hover:underline"
          >
            or register
          </a>

          <span className="w-1/5 border-b  md:w-1/4"></span>
        </div>
      </Form>
    </div>
  );
}
