<script>
  let count = 0;
  const increment = () => (count += 1);
  const decrement = () => (count -= 1);
</script>

<main>
  <p data-testid="counter-value" class="text-xl text-center">{count}</p>
  <div class="flex text-xl text-white">
    <button class="px-4 py-1 bg-red-500" on:click={decrement}>-</button>
    <button class="px-4 py-1 bg-green-500" on:click={increment}>+</button>
  </div>
</main>
