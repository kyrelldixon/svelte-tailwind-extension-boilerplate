<script>
  let count = 0;
  const increment = () => (count += 1);
  const decrement = () => (count -= 1);
</script>

<main>
  <div>
    <button on:click={decrement}>-</button>
    <button on:click={increment}>+</button>
  </div>
  <p>{count}</p>
</main>
