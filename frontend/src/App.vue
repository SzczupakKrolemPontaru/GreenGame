<template>
  <div>
    <MultiplayerBoard />
    <!-- Add other components or content here if needed -->
  </div>
</template>

<script>
import MultiplayerBoard from "@/components/MultiplayerBoard.vue"; // Updated import

export default {
  name: "App",
  components: {
    MultiplayerBoard, // Updated component name
    // Add other components here if needed
  },
};
</script>

<style>
</style>
