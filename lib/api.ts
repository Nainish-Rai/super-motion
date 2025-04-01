import { prisma } from "../lib/prisma";
import type { User, Post, Prisma } from "@prisma/client";

export const api = {
  // User operations
  async getUsers() {
    return prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  },

  async getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  },

  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      include: {
        posts: true,
      },
    });
  },

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        posts: true,
      },
    });
  },

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  },

  // Post operations
  async getPosts() {
    return prisma.post.findMany({
      include: {
        author: true,
      },
    });
  },

  async getPostById(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  },

  async createPost(data: Prisma.PostCreateInput) {
    return prisma.post.create({
      data,
      include: {
        author: true,
      },
    });
  },

  async updatePost(id: number, data: Prisma.PostUpdateInput) {
    return prisma.post.update({
      where: { id },
      data,
      include: {
        author: true,
      },
    });
  },

  async deletePost(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  },
};
