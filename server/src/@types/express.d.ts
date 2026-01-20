import express from "express";

declare global {
  namespace Express {
    interface Request {
      objKey?: {
        status: boolean;
        key: string;
        permissions: string[];
        createdAt: NativeDate;
        updatedAt: NativeDate;
        _id: Types.ObjectId;
        __v?: number;
      };
      accessToken?: string;
    }
  }
}
