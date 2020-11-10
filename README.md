# Unholy-Arts
Source code for the game Unholy Arts. NSFW

Unholy Arts - Documentation

1. Introduction

- How's the game built?

The game is built using the application Twine, on the format Sugarcube 2.30.0. If you want to edit the game, it's recommended to download Twine and keep Sugarcube's documentation at hand.
The game's code is written on several different Javascript files, which are later put together and integrated into the game's html file. The Twine's community has their own applications to speed up this process, you may look for them at twinery.org and their subreddit. I use a very simple app that I made for this purpose called "Files Merger", which you should be able to find here. If you use my app, once you add each single .js file, a configuration file will be created or modified to remember the files' directions.
The game's art is made by third party artists, and there's not much advice I can offer on that area.

- What may I do with the game's files?

You may edit the game's code and story to your heart's content and redistribute it for non-commercial purposes, for which I recommend Unholy Arts' Discord channel. If you want to add content forbidden by Patreon's rules (such as incest, bestiality), please do not use official spaces of the game to do it. Other forms of extreme content are fine as long as you properly warn about it.

- What skills do I need?

In order to edit the game's story and parameters of the game, you'll do fine with some basic knowledge on pseudo-coding and/or the patience to learn the sintax.

In order to add new scene actions or social interactions you need a basic understanding of coding and Javascript.

If you want to modify or expand the inner workings of the game, it's recommended to have some experience as a programmer, lots of patience and the willpower to deal with my very mediocre organization. You can send me your doubts on Discord and I reply you if I have the time. If the response requires a lot of work, I may also need the question to be interesting.

2. Categories

Let's quickly categorize the game's code files:

- Core: This includes the most foundational aspects of the game's code, as well as a lot of auxiliar functions to ease the coder's life in a wide variety of situations.
- UI and HTML: General UI functions that are relevant through many parts of the code.
- Scenes: Everything related to sex and battle scenes.
- Map: Everything related to the map's logic, and most things related to the map periods' UI.
- Social: Everything related to socialization and character relationships. Arguably, a part of this fits into core, but it got big enough to justify its own category.
- Others: Things of small to moderate size very specific to Unholy Arts that would probably fit well in a different stand-alone game.
- Supporter Rewards: I will only be uploading non-supporter-data.js for obvious reasons. non-supporter-data.js contains some placeholder information to keep the game's UI consistent when supporter-tools.js hasn't been included in the game's code.

3. Specific files

- Core
  - a-common-functions.js : Includes a lot of functions that are used all the time through the rest of the code, for a wide variety of purposes. If you want to get into the game's code, it's recommended to give it at least one long look, and keep it open afterwards.
  - config.js : Sets up the settings menu and some other configuration data.
  - stat-classes.js : Includes many classes used by characters, actions and more. As of v0.2, these are: Stat, Bar (bar stats), Bodypart, Drive (barely started), Mood, Virginity, Position, flavorAffinities, flavorAffinity and alteredState.
  - character-class.js : Character class, as well as some auxiliar functions related to groups and favors.
  
- UI and HTML
  - general-functions.js : Supposedly reserved for functions that may be generally used through the whole game. They're actually used to feed information to the lateral UI bars.
  - sidebar.js : Code from greyelf posted on twinery.org to set up the second UI bar.
  - statsChart.js : Functions used to create certain UI elements that require HTML formatting.
  
- Scenes
  - scene-class.js : Core code for sex and battle scenes.
  - scene-actions-class.js : Core code for scene actions.
  - sex-scene-actions.js , scene-continued-actions-class.js , battle-scene-actions.js , battle-continued-actions.js : Code for specific actions in sex and battle scenes. Continued actions are invoked by normal actions found in sex-scene-actions and battle-scene-actions, but the other two files contain code for their continued effects.
  - post-scene-logic.js : Functions that handle the effects of some scenes. Nothing of this is related to scripts invoked by story scenes.
  - battle-demands.js : Code managing battle demands.
  - altered-state-constructors.js : Constructors for specific altered state objects of specific types.
  
- Maps - Tremble and run away. Only hideous code lies here and it will consume your whole being.
  - map-class.js : Core code for map logic and UI. Most of the logic is contained at the compass class and the auxiliar functions above it. The map class is called Chart. You shouldn't call a Javascript class "Map". A few hours of my life were turned into pointless frustration to discover this knowledge.
  - scenarios.js : A scenario is a map period with specific settings. This file contains functions to initialize them.
  - temple-maps.js : Contains information to initialize the Passion Temple map.
  - map-actions.js and map-actions-training.js : Code that creates and manages map actions and events.
  - daycycle-class.js : Days, months, hours, minutes.
  - calendar.js : Manages and initiates story events. See Others/story-events.js for story events' scripts.
  
  - npcglobalai-class.js : Highest level of map AI. Checks each character's situation, stablishes priorities and medium-term objectives.
  - npcmapai-class.js : Low level of map AI. Translates the objetives decided by the global AI into lists of short term goals that interact with map logic.
  - npcsocialai-class.js : The social interactions system asks each NPC which actions and topics should be used and brought up each round, and this class formulates the answers.
  - pathfinder.js : Used by npcmapai-class.js to repeteadly crash the game. It uses a custom implementation of A* search.
  
- Social
  - Relations.js : Code that handles relations and special relationships.
  - social-interactions-system.js : Contains the core code for the socialization system.
  - social-interactions-data.js : Code for specific social interactions actions.
  - social-interactions-specifics.js : Code for social interactions' specific topics.
  - npcsisai-class.js : Ignore this. The socialization AI is in Maps, for some reason.
  
- Others
  - custom-scripts.js : Functions generally used for specific purposes in the story, such as configuring the player character, and occasionally for debug purposes.
  - resources.js : Functions used to facilitate access to game's resources.
  - pre-built-characters.js : Constructors for premade character objects.
  - sim-cycle-pars.js : Simulation cycle parameters. If you want to mess with the game's logic, you may want to take a look at this.
  - story-events.js : Scripts for story events.
  - custom-scene-scripts.js : Scripts and functions for story scenes.
  - personal-room.js : Personal room menu, also manages the new day processes.
  - jobs.js : Logic and UI for the working period.
  - scrolls.js and scrolls-class.js : Self-explaining.
  
Non-categorized
  - ai-functions-class.js : This belongs in the Scene category. It actually contains code for scene AI.
  - a-log-tools.js : A couple of variables used to store data during bug hunting season.
  - scene-dialog.js : Created during the earliest stage of development to feed character dialogs to scenes. It was repeatedly pushed forward. When actual scene dialogs are added into the game, this will probably be rewritten entirely.
  - non-supporter-data.js : Contains code required to maintain the UI's coherence when the Supporter Rewards' code is missing.

4. Notes and other information

More specific documentation will be written for specific topics in the future, especially if it's requested. I renounce to all responsibility for any souls that get lost after wandering into this mess.



