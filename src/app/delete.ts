"use server";

import {cookies} from "next/headers";

export default async function Delete(name: string) {
	cookies().delete(name);
}
