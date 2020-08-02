<template>
	<v-app >
		<v-app-bar app color="black" dark 
		:hide-on-scroll="$vuetify.breakpoint.smAndUp">
			<v-avatar v-show="$vuetify.breakpoint.smAndUp"> 
				<v-btn app to="/" depressed icon>
					<img
						src='./assets/home-iesa.jpg'
						alt="Iesa"
					>
				</v-btn>
				
				
			</v-avatar>
			<v-spacer></v-spacer>
			<v-btn
				v-for="link in links"
				:key="`${link.label}-header-link`"
				text
				rounded
				:to="link.url"
			>
				{{ link.label }}
			</v-btn>
			<v-spacer></v-spacer>
			<v-toolbar-title v-show="$vuetify.breakpoint.mdAndUp" >
				<v-btn text to="/" depressed>
					Iesa Wazeer
				</v-btn>
			</v-toolbar-title>
			

		</v-app-bar>
		
		<v-main>
			<router-view></router-view>
		</v-main>
		<v-footer color="black lighten-1" padless>
			
			<v-layout justify-center wrap>
				<v-btn
					v-for="contact in contacts"
					:key="`${contact.name}-footer-link`"
					color="white"
					text
					rounded
					class="my-2"
					:href="contact.url"
					target="_blank"
				>
					<!-- Can change to icons of github and linkedin -->
					{{contact.name}}
				</v-btn>
				<v-btn
					v-for="link in links"
					:key="`${link.label}-footer-link`"
					color="white"
					text
					rounded
					class="my-2"
					:to="link.url"
				>
					{{ link.label }}
				</v-btn>
				<v-flex black lighten-2 py-4 text-center white--text xs12>
				<div> <strong> Email: </strong> iesa.wazeer@warwick.ac.uk </div>
				{{ new Date().getFullYear() }} — <strong>Iesa Wazeer Copyright &copy;</strong>
					
				</v-flex>
			</v-layout>
		</v-footer>
  </v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			links: [
				{
					label: 'Home',
					url: '/'
				},
				{
					label: 'Games',
					url: '/games'
				},
				{
					label: 'About',
					url: '/about'
				},
				
			],
			contacts: [
				{
					name: 'GitHub',
					url: 'https://github.com/izman48'
				},
				{
					name: 'LinkedIn',
					url: 'https://www.linkedin.com/in/iesaw/'
				},
			]
		}
	}
}
</script>