import { pubsubService } from "@/services/pubsub";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("channelId");

    if (!id)
      return NextResponse.json(
        { message: "Missing channelId" },
        { status: 400 },
      );

    const subscribeResult = await pubsubService.subscribeToChannel(id);

    if (!subscribeResult.ok) {
      return NextResponse.json(
        {
          message: "Subscription failed",
          subscribe: subscribeResult,
        },
        { status: 502 },
      );
    }

    await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

    const publishResult = await pubsubService.forcePublish(id);

    if (!publishResult.ok) {
      return NextResponse.json(
        {
          message: "Subscribed but force publish failed",
          subscribe: subscribeResult,
          publish: publishResult,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        message: "Subscription and publish request succeeded",
        subscribe: subscribeResult,
        publish: publishResult,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected sync error";
    return NextResponse.json(
      {
        message,
      },
      { status: 500 },
    );
  }
};
