<script>
	import supabase from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	let loading = false;
	// let email;
	// let password;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('Please enter a valid email address').required('Email is required'),
			password: yup
				.string()
				.min(6, 'Password must be at least 6 characters')
				.required('Password is required')
		}),
		onSubmit: async (values) => {
			try {
				loading = true;
				const { user, session, error } = await supabase.auth.signUp({
					email: values.email,
					password: values.password
				});
				if (error) throw error;
				goto('/profile');
			} catch (error) {
				console.error(error.error_description || error.message);
			} finally {
				loading = false;
			}
		}
	});
</script>

<div class="mx-auto flex justify-center max-w-md border border-gray-500 p-8 rounded">
	<form class="form-control w-full" on:submit={handleSubmit} novalidate>
		<h1 class="text-2xl text-center">Welcome to NBA Pick'em</h1>
		<p class="description my-4 text-center">Sign up for a new account with your email below</p>
		<label class="label" for="email">
			<span class="label-text">Email</span>
		</label>
		<input
			bind:value={$form.email}
			on:change={handleChange}
			id="email"
			type="email"
			name="email"
			placeholder="Email address"
			class={`input input-bordered w-full ${$errors.password ? 'input-error' : 'input-primary'}`}
		/>
		<span class="text-error label-text-alt pt-2">{$errors.email}</span>
		<label class="label" for="password">
			<span class="label-text">Password</span>
		</label>
		<input
			bind:value={$form.password}
			on:change={handleChange}
			id="password"
			type="password"
			name="password"
			placeholder="Password"
			class={`input input-bordered w-full ${$errors.password ? 'input-error' : 'input-primary'}`}
		/>
		<span class="text-error label-text-alt pt-2">{$errors.password}</span>
		<button class={`btn btn-primary my-4 ${loading && 'loading'}`} type="submit">Submit</button>
		<p>Already have an account? <a href="/login" class="link link-primary">Login</a></p>
	</form>
</div>
