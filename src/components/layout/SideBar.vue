<script setup lang="ts">
import { globalStore } from "../../stores";
import { cn } from "../../utils/cn";
import LogoLink from "../common/LogoLink.vue";

const { sidebarOpen, toggleSidebar } = globalStore();
</script>

<template>
  <div
    :class="
      cn(
        'fixed top-0 left-0 z-10 h-screen w-screen bg-black/50 md:relative',
        sidebarOpen ? 'flex' : 'hidden',
        'md:hidden',
      )
    "
    @click="() => toggleSidebar(false)"
  />
  <div
    :class="
      cn(
        'fixed top-0 right-0 z-20 flex h-dvh w-64 flex-col border-l border-border bg-background p-4 transition-transform md:right-auto md:left-0 md:border-r md:border-l-0',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full',
        'md:translate-x-0',
      )
    "
  >
    <LogoLink classes="hidden md:flex" />
    <UserShortInfo mobile />
    <ul className="flex flex-col gap-2">
      <SidebarLink href="/dashboard" iconSrc="house.svg" title="Dashboard" />
      <SidebarLink href="/goals" iconSrc="goal.svg" title="Goals" />
      <SidebarLink href="/habits" iconSrc="calendar.svg" title="Habits" />
      <SidebarLink href="/avatar" iconSrc="user.svg" title="Avatar" />
    </ul>
  </div>
</template>
