<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
</script>

<div class="sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/store" class="flex items-center space-x-3">
            <div class="hidden md:block">
                <Avatar.Root>
                    <Avatar.Image src="/logo.jpg" alt="@ststar.challenge" />
                    <Avatar.Fallback>ST</Avatar.Fallback>
                </Avatar.Root>
            </div>
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ST Star Challenge 16</span>
        </a>
    
        <a href="/store/cart" class="relative md:hidden">
            <!-- <ShoppingCart class="h-8 w-8" /> -->
            <span class="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-semibold text-white bg-red-500 rounded-full">1</span>
        </a>
    
        <div class="hidden w-full md:block md:w-auto">
            <ul class="font-medium flex flex-col items-center p-4 md:p-0 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/store" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all">Home</a>
              </li>
              <li>
                <a href="/store" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all">Home</a>
              </li>
            </ul>
        </div>
    </div>
</div>

<slot></slot>